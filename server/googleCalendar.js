const { google } = require('googleapis');
const { OAuth2 } = google.auth;
require('dotenv').config();

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const createEvent = async (date, time, summary) => {
    const event = {
        summary,
        start: {
            dateTime: `${date}T${time}:00-07:00`,
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: `${date}T${parseInt(time) + 1}:00-07:00`,
            timeZone: 'America/Los_Angeles',
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        console.log('Event created: %s', response.data.htmlLink);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

module.exports = createEvent;
