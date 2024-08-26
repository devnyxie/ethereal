import React, { useState, useEffect } from "react";
import ActivityCalendar from "react-activity-calendar";
import colors from "tailwindcss/colors";

interface Props {
  resolvedTheme: "dark" | "light";
}

const GithubCalendarInner: React.FC<Props> = ({ resolvedTheme }) => {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/devnyxie?y=last"
        );
        const result = await response.json();
        if (result) {
          setData(result.contributions);
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      {data && data.length > 0 && (
        <ActivityCalendar
          data={data}
          blockSize={11}
          hideTotalCount={true}
          theme={{
            light: [
              "hsl(0, 0%, 88%)",
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
          colorScheme={resolvedTheme}
        />
      )}
    </div>
  );
};

export default GithubCalendarInner;
