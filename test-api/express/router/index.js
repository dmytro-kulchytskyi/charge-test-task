import express from 'express';
import { validation, handleValidationErrors } from './validation.js';
import { getOrganizations, createOrganization } from '../../providers/organization/index.js';
import queue from '../../queue/index.js';

const router = express.Router();

router.get('/organizations', async (req, res) => {
  const format = req.query.data || 'full';
  const { user } = req;
  const organizations = await getOrganizations();
  res.status(200).json(
    organizations.map(organization => formatOrganization(organization, user, format)),
  );
});

router.post('/organizations', validation, handleValidationErrors, async (req, res) => {
  const format = req.query.data || 'full';
  const process = !!req.query.process;
  const { user } = req;
  const data = req.body;

  const organization = await createOrganization(data, user)

  if(process) {
    queue.add('process', { 
      user,
      organizationId: organization.id,
    });
  }

  res.status(201).json(formatOrganization(organization, user, format));
});

export default router;

function formatOrganization(organization, user, format) {
  const statusHistory = getStatusHistory(organization);
  const data = getData(organization, format);
  const { status } = statusHistory[0];
  return {
    id: organization.id,
    identifier: organization.identifier,
    source: {
      method: 'api',
      version: '1.0',
      user: user,
    },
    data,
    result: {
      status,
      codes: [],
      statusHistory,
      checks: [],
    },
    notes: [],
    createdAt: organization.createdAt,
    updatedAt: organization.updatedAt,
  };
}

function getStatusHistory({ statuses }) {
  return statuses.map(({ status, userId, userIdentifier, createdAt }) => ({
    status,
    user: {
      id: userId,
      identifier: userIdentifier,
    },
    createdAt,
  }));
}

function getData(organization, format) {
  const data = extractDataFields(organization);

  if (format === 'base64') {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  };

  if(format === 'full') {
    return data;
  }

  return {};
}

function extractDataFields(data) {
  return {
    id: data.id,
    identifier: data.identifier,
    dba: data.dba,
    ein: data.ein,
    businessType: data.businessType,
    bankAccountType: data.bankAccountType,
    businessStreetAddress: data.businessStreetAddress,
    businessState: data.businessState,
    businessZip: data.businessZip,
    businessCountry: data.businessCountry,
    contactFirstName: data.contactFirstName,
    contactLastName: data.contactLastName,
    contactTitle: data.contactTitle,
    contactPhone: data.contactPhone,
    contactEmail: data.contactEmail,
    website: data.website,
    ip: data.ip,
    deviceFingerprint: data.deviceFingerprint,
    meta: data.meta,
    additionalChecks: data.additionalChecks,
  };
}
