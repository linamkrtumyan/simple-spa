import { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/actions";
import Pagination from "./Pagination";

interface IRootProps {
  wrapperRef?: React.RefObject<HTMLDivElement>;
  users?: any;
  fetchUsers?: () => void;
  currentPage: number;
  lang: string;
}

interface IState {
  show: Boolean;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  usersik: any;
  postsPerPage: number;
}

type User = {
  name: string;
  review: string;
  date: string;
};

type IProps = IRootProps & typeof mapDispatchToProps;

class Main extends Component<IProps, IState> {
  state: IState = {
    show: false,
    wrapperRef: null,
    usersik: [],
    postsPerPage: 10,
  };

  componentDidMount(): void {
    this.props.fetchUsers();
    this.setState({
      usersik: this.props.users,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.props.fetchUsers();
      this.setState({
        usersik: this.props.users,
      });
    }
  }

  render() {
    const indexOfLastPost = this.props.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.props.users.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <div className="flex flex-col m-5 relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <tbody>
            {currentPosts.map((user: User, idx: number) => (
              <tr key={idx} className="bg-white border-b ">
                <td className="px-6 py-4">
                  {user?.name
                    .split(" ")
                    .map((n, idx) => {
                      if (idx != 0) return n[0];
                      else return n;
                    })
                    .join(" ")}
                </td>
                <td className="px-6 py-4">{user?.review}</td>
                <td className="px-6 py-4">{user?.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.props.users.length > 10 && (
          <Pagination
            totalPosts={this.props.users.length}
            postsPerPage={this.state.postsPerPage}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: Object.values(state.usersReducer.users),
  currentPage: state.pageReducer.page,
  lang: state.languageReducer.lang,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
