import { useState, useEffect } from 'react';
import './ReportAnalytics.css'

const ReportAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [analytics, setAnalytics] = useState({
    userStats: {},
    revenueStats: {},
    topProducts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // Simulating API call with mock data
      const response = await new Promise(resolve => setTimeout(() => resolve({
        userStats: {
          totalUsers: 1000,
          newUsers: 50,
          activeUsers: 750
        },
        revenueStats: {
          totalRevenue: 50000,
          averageOrderValue: 100
        },
        topProducts: [
          { name: "Product A", sales: 100 },
          { name: "Product B", sales: 75 },
          { name: "Product C", sales: 50 }
        ]
      }), 1000));
      
      setAnalytics(response);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="report-analytics">
      <h1>Report & Analytics</h1>

      <div className="date-range">
        <label>
          Start Date:
          <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} />
        </label>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h2>User Statistics</h2>
          <p>Total Users: {analytics.userStats.totalUsers}</p>
          <p>New Users: {analytics.userStats.newUsers}</p>
          <p>Active Users: {analytics.userStats.activeUsers}</p>
        </div>

        <div className="analytics-card">
          <h2>Revenue Statistics</h2>
          <p>Total Revenue: ${analytics.revenueStats.totalRevenue}</p>
          <p>Average Order Value: ${analytics.revenueStats.averageOrderValue}</p>
        </div>

        <div className="analytics-card">
          <h2>Top Products</h2>
          <ul>
            {analytics.topProducts.map((product, index) => (
              <li key={index}>{product.name}: {product.sales} sales</li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={() => console.log("Exporting report...")}>
        Export Report
      </button>
    </div>
  );
};

export default ReportAnalytics;