import React, {useState} from "react";
class DisplayInfor extends React.Component{
    
    render(){
        return (
            <div>
              {this.props.listUser && this.props.listUser.length > 0 ? (
                this.props.listUser.map((user) => (
                  <div key={user.id} className={user.Age < 18 ? "red" : "blue"}>
                    <div>User name is: {user.Name}</div>
                    <div>User Age: {user.Age}</div>
                    <button onClick={() => {
                    this.props.handleDeleteUser(user.id)
                    }}>Delete</button>

                    <hr />
                  </div>
                ))
              ) : (
                <div>No users found</div>
              )}
            </div>
          );
    }
}
export default DisplayInfor;