#include <stdio.h>

char daytab[2][13] = {
	{0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
	{0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
};

int is_leap(int year);
int day_of_year(int year, int month, int day);
void month_day(int year, int day_num, int *pmonth, int *pday);

int main() {
	int year, month, day, day_num, pmonth, pday;

	year = 2016;
	month = 11;
	day = 12;
	day_num = 316;

	printf("%d\n", day_of_year(year, month, day));
	month_day(year, day_num, &pmonth, &pday);
	printf("month - %d; day - %d\n", pmonth, pday);
	return 0;
}

int day_of_year(int year, int month, int day) {
	int i;
	int leap_idx = is_leap(year) ? 0 : 1;
	for (i = 0; i < month; i++)
		day += daytab[leap_idx][i];
	return day;
}

void month_day(int year, int day_num, int *pmonth, int *pday) {
	int leap_idx = is_leap(year) ? 0 : 1;
	for (*pmonth=0; (*pday = (day_num -= daytab[leap_idx][*pmonth])) > 0; (*pmonth)++);
	*pday += daytab[leap_idx][*pmonth];
}

int is_leap(int year) {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
