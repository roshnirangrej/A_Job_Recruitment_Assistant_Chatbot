
// Assuming you have Jest configured and imported necessary dependencies

// Import the function to test
const { fetchAvailability } = require('../../frontend/src/Components/Chatbot');

describe('fetchAvailability function', () => {
  // Mock the global fetch function
  global.fetch = jest.fn();

  beforeEach(() => {
    // Clear all mock calls before each test
    fetch.mockClear();
  });

  test('should fetch availability data when job role is provided', async () => {
    // Mock response data
    const availabilityData = { availability: 'available' };
    const jobRole = 'developer';

    // Mock the fetch function to return a Promise with resolved value
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(availabilityData),
    });

    // Call the function
    await fetchAvailability(jobRole);

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/api/getAvailability?jobrole=${encodeURIComponent(jobRole)}`);

    // Check if availability data was set
    expect(setAvailability).toHaveBeenCalledWith(availabilityData);
  });

  test('should handle error when job role is missing', async () => {
    // Call the function without providing job role
    await fetchAvailability();

    // Check if an error message is logged
    expect(console.error).toHaveBeenCalledWith('Job role parameter is missing from the URL');
  });

  test('should handle HTTP error', async () => {
    const jobRole = 'developer';

    // Mock the fetch function to return a Promise with rejected value
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    // Call the function
    await fetchAvailability(jobRole);

    // Check if an error message is logged
    expect(console.error).toHaveBeenCalledWith('Error fetching availability: Error: HTTP error! Status: 404');
  });
});
