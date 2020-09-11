import sequalize from '../../database/sequelize.js';
import Organization from '../../models/Organization.js';
import ProcessingStatus from '../../models/ProcessingStatus.js';
import Statuses from '../../models/enums/Statuses.js';

export function getOrganizations() {
  const statusesInclude = { model: ProcessingStatus, as: 'statuses' };
  return Organization.findAll({ 
    include: [statusesInclude],
    order: [[statusesInclude, 'createdAt', 'DESC']],
  });
}

const getStatusData = (organizationId, status, user) =>  ({ 
  organizationId,
  status, 
  userId: user.id,
  userIdentifier: user.identifier,
});

export async function createOrganization(data, user) {
  const transaction = await sequalize.transaction();
  try {
    const organization = await Organization.create(data, { transaction });

    await ProcessingStatus.create(getStatusData(organization.id, Statuses.CREATED, user), { transaction })
    await ProcessingStatus.create(getStatusData(organization.id, Statuses.PROCESSING, user), { transaction })

    await transaction.commit();


    const statusesInclude = { model: ProcessingStatus, as: 'statuses' };
    return Organization.findOne({ 
      where: { id: organization.id },
      include: [statusesInclude],
      order: [[statusesInclude, 'createdAt', 'DESC']],
    });
  } catch(e) {
    await transaction.rollback();
    throw e;
  }
}

export function setProcessed(organizationId, user) {
  const status = getStatusData(organizationId, Statuses.PROCESSED, user);
  return ProcessingStatus.create(status);
}
