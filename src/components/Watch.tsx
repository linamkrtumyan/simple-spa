import { Component } from "react";

interface IProps {}

interface IState {
  date: any;
  time: string;
  locale: string;
}

export default class Watch extends Component<IProps, IState> {
  state = { date: null, time: null, locale: "en" };

  componentDidMount(): void {
    const id = setInterval(() => {
      this.setState((prevState) => {
        return {
          ...prevState,
          date: new Date(),
          time: new Date().toLocaleTimeString(this.state.locale, {
            hour: "numeric",
            hour12: false,
            minute: "numeric",
            second: "numeric",
          }),
        };
      });
    }, 1000);
  }

  render() {
    return (
        <div>{this.state.time && String(this.state.time)}</div>
    );
  }
}
