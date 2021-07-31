import BaseEntity from "./BaseEntity";

class Admission extends BaseEntity {
  name: string;
  userIds: string[];
  admittingLeaders: boolean;
  admittingMembers: boolean;
  deleteDate: Date;
}

export default Admission;