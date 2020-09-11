import Organization from './Organization.js';
import ProcessingStatus from './ProcessingStatus.js'

export default function() {
  Organization.hasMany(ProcessingStatus, { as: 'statuses' });
  ProcessingStatus.belongsTo(Organization);
};