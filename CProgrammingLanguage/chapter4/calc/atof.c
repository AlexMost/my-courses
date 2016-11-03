#include <ctype.h>
#include <math.h>

double atof(char s[]) {
	double val, power, exp;
	int i, sign;
	char exp_sign;
	sign = 1;
	exp = 1.0;
	// strip whitespaces
	for (i = 0; isspace(s[i]); i++);

	// check minus sign
	if (s[i] == '-')
		sign = -1;

	// skip all garbage before numbers
	while (!isdigit(s[i]))
		i++;

	// before floating point (real number)
	for (val = 0.0; isdigit(s[i]); i++)
		val = 10 * val + (s[i] - '0');

	if (s[i] == '.')
		i++;

	// floating point check
	for (power = 1.0; isdigit(s[i]); i++) {
		val = 10 * val + (s[i] - '0');
		power *= 10;
	}

	// exponential form check
	if((s[i] == 'e' || s[i] == 'E')) {
		exp_sign = s[i + 1];
		i += 2;
		for (exp = 0; isdigit(s[i]); i++)
			exp = 10 * exp + (s[i] - '0');

		exp = pow(10, exp);

		if(exp_sign == '-')
			exp = 1 / exp;
	}

	return (sign * val / power) * exp;
}
