import React, { Component } from "react";
import ActivityCalendar from "react-activity-calendar";
import colors from "tailwindcss/colors";

interface Props {
  resolvedTheme: "dark" | "light";
}

interface State {
  data: any[] | null;
  error: Error | null;
  loading: boolean;
}

class GithubCalendar_inner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://github-contributions-api.jogruber.de/v4/devnyxie?y=last")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ data: data.contributions, loading: false });
        }
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { data, error, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="">
        {data && data.length > 0 && (
          <>
            <ActivityCalendar
              data={data}
              blockSize={11}
              hideTotalCount={true}
              theme={{
                light: [
                  "hsl(0, 0%, 92%)",
                  colors.green[400],
                  colors.green[500],
                  colors.green[600],
                  colors.green[700],
                ],
                dark: [
                  "#333",
                  colors.green[800],
                  colors.green[700],
                  colors.green[600],
                  colors.green[500],
                ],
              }}
              colorScheme={this.props.resolvedTheme}
            />
          </>
        )}
      </div>
    );
  }
}

export default GithubCalendar_inner;
