const pool = require('./index.js');

const fetchBookings = () => {
	const queryStr = 'SELECT business_id, booking_type FROM bookings';
	return pool.query(queryStr).then((data) => data.rows);
};

const addBooking = (date, type, id, lat, lon) => {
	const queryStr = `INSERT INTO bookings (booking_date, booking_type, business_id, latitude, longitude) \
                    VALUES ($1, $2, $3, $4, $5)`;
	return pool.query(queryStr, [date, type, id, lat, lon]).then((response) => response);
};

const fetchFollows = (user_id) => {
	const queryStr = `SELECT json_agg(artist_id) FROM follows WHERE fan_id=$1`;
	return pool.query(queryStr, [user_id]).then((response) => response);
};

module.exports = {
	addBooking,
	fetchBookings,
	fetchFollows
};
