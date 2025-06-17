import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import useReport from "../contexts/ReportsDataContext";

const Report = () => {

  const {tasksCompletedByTeam, tasksCompletedLastWeek, pendingWorkByProject , } = useReport()
  console.log("TasksCompletedLastWeek", tasksCompletedLastWeek)
  console.log("tasksCompletedByTeam", tasksCompletedByTeam)
  console.log("PendingworkbyProject", pendingWorkByProject)


  const barChartLastWeekRef = useRef(null);
  const barChartPendingRef = useRef(null);
  const pieChartTeamRef = useRef(null);

  const barLastWeekInstance = useRef(null);
  const barPendingInstance = useRef(null);
  const pieTeamInstance = useRef(null);

  useEffect(() => {
    if (!tasksCompletedLastWeek.length || !tasksCompletedByTeam.length || !pendingWorkByProject.length) return;

    // Destroy existing charts
    barLastWeekInstance.current?.destroy();
    barPendingInstance.current?.destroy();
    pieTeamInstance.current?.destroy();

    // Bar Chart: Work Done Last Week
    const lastWeekLabels = [...new Set(tasksCompletedLastWeek.map(task => task.project?.name || "Unknown"))];
    const lastWeekData = lastWeekLabels.map(
      projectName => tasksCompletedLastWeek.filter(task => task.project?.name === projectName).length
    );

    barLastWeekInstance.current = new Chart(barChartLastWeekRef.current, {
      type: "bar",
      data: {
        labels: lastWeekLabels,
        datasets: [{
          label: "Tasks Completed",
          data: lastWeekData,
          backgroundColor: "#36a2eb"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Tasks"
            }
          },
          x: {
            title: {
              display: true,
              text: "Projects"
            }
          }
        }
      }
    });

    // Bar Chart: Pending Work
    const pendingLabels = pendingWorkByProject.map(p => p.projectName);
    const pendingData = pendingWorkByProject.map(p => p.totalPendingDays);

    barPendingInstance.current = new Chart(barChartPendingRef.current, {
      type: "bar",
      data: {
        labels: pendingLabels,
        datasets: [{
          label: "Total Days of Work Pending",
          data: pendingData,
          backgroundColor: "#ff9f40"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Days"
            }
          },
          x: {
            title: {
              display: true,
              text: "Projects"
            }
          }
        }
      }
    });

    // Pie Chart: Tasks Closed by Team
    const teamLabels = tasksCompletedByTeam.map(item => item.teamName);
    const teamData = tasksCompletedByTeam.map(item => item.completedTasks);

    pieTeamInstance.current = new Chart(pieChartTeamRef.current, {
      type: "pie",
      data: {
        labels: teamLabels,
        datasets: [{
          data: teamData,
          backgroundColor: ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236", "#166a8f"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });

    return () => {
      barLastWeekInstance.current?.destroy();
      barPendingInstance.current?.destroy();
      pieTeamInstance.current?.destroy();
    };
  }, [tasksCompletedLastWeek, tasksCompletedByTeam, pendingWorkByProject]);

  return (
    <div className="container py-4">
      <Link to="/" className="text-decoration-none text-primary">
        <strong>← Back to Dashboard</strong>
      </Link>
      <h1 className="my-4">Report Overview</h1>

      {/* Chart: Tasks Completed Last Week */}
      <section className="mb-5">
        <h4 className="text-primary">Total Work Done Last Week</h4>
        <div className="bg-white rounded shadow-sm p-3" style={{ height: "400px" }}>
          <canvas ref={barChartLastWeekRef}></canvas>
        </div>
      </section>

      {/* Chart: Pending Work */}
      <section className="mb-5">
        <h4 className="text-warning">Total Days of Work Pending</h4>
        <div className="bg-white rounded shadow-sm p-3" style={{ height: "400px" }}>
          <canvas ref={barChartPendingRef}></canvas>
        </div>
      </section>

      {/* Chart: Tasks Closed by Team */}
      <section className="mb-5">
        <h4 className="text-success">Tasks Completed by Team</h4>
        <div className="bg-white rounded shadow-sm p-3" style={{ height: "400px" }}>
          <canvas ref={pieChartTeamRef}></canvas>
        </div>
      </section>
    </div>
  );
};

export default Report;
