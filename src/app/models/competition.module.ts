export default interface Competition {
  id?: number,
  name: string,
  creator: string,
  // TODO: users
  userGroups: string[],
  userProfiles: string[],
  // TODO: events
  created: Date,
  lastModified: Date,
  status: string
}
