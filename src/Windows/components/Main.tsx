import * as React from "react";
import { User } from "../../Users";
import UserComponent from "../../Users/components/User";

export type Props = {
  users: User[];
};

export default class MainWindow extends React.Component<Props, undefined> {
  render() {
    return (
      <div>
        <h2>Users Seen.</h2>
        {this.props.users.map(user => <UserComponent key={user.name} user={user} />)}
      </div>
    );
  }
}
