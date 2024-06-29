import cron from 'node-cron';
import { updateDailyEarnings } from '../services/investment.service';

// Schedule the cron job to run daily at midnight
const cronSchedule = '* * * * *'; // Minute: 0, Hour: 1, Every Day
const cronJob = cron.schedule(
  cronSchedule,
  async () => {
    console.log('Running daily earnings update...');
    try {
      await updateDailyEarnings();
      console.log('Daily earnings update completed successfully');
    } catch (error) {
      console.error('Error updating daily earnings:', error);
    }
  },
  {
    scheduled: true, // Start the cron job immediately
    timezone: 'Asia/Kolkata' // Specify the timezone (adjust as needed)
  }
);

// Handle errors and logs from the cron job
cronJob.on('error', (error) => {
  console.error('Cron job error:', error);
});
cronJob.on('stop', () => {
  console.log('Cron job stopped');
});

// Optionally, stop the cron job when your application exits
process.on('SIGINT', () => {
  cronJob.stop();
});
