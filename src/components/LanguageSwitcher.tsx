import { Component, createRef } from "react";
import { connect } from "react-redux";
import { setLanguage } from "../store/actions";

interface IRootProps {
  wrapperRef?: React.RefObject<HTMLDivElement>;
  language?: string;
  setLanguage?: (lang: string) => void;
}

interface IState {
  show: Boolean;
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

type IProps = IRootProps & typeof mapDispatchToProps;

class LanguageSwitcher extends Component<IProps, IState> {
  state: IState = { show: false, wrapperRef: null };

  constructor(props: IProps) {
    super(props);
    this.state.wrapperRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.state.wrapperRef &&
      !this.state.wrapperRef.current.contains(event.target)
    ) {
      this.setState((prevState) => {
        return {
          ...prevState,
          show: false,
        };
      });
    }
  }

  toggleShow = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        show: !this.state.show,
      };
    });
  };

  handleSetLanguage = (lang: string) => {
    this.props.setLanguage(lang);
    this.setState((prevState) => {
      return { ...prevState, show: false };
    });
  };

  render() {
    return (
      <div ref={this.state.wrapperRef}>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="flex items-center p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
          type="button"
          onClick={this.toggleShow}
        >
          {this.props.language}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          className={`z-10 ${
            this.state.show ? "visible" : "hidden"
          } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}
        >
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                className="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
                onClick={() => this.handleSetLanguage("en")}
              >
                English
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
                onClick={() => this.handleSetLanguage("ru")}
              >
                Russian
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.languageReducer.lang,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (lang: string) => {
      dispatch(setLanguage(lang));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
