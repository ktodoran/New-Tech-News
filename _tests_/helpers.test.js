const { format_date } = require('../utils/helpers');
test('format_date() returns a date string', () => {
    const date = new Date('2021-09-10 13:12:03');
    expect(format_date(date)).toBe('9/10/2021');
});