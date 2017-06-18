#include <stdarg.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define MAXLEN 100

int atoi(const char *str);
int isspace(int c);
int getchar(void);
int isdigit(int c);
int read_int();

void minscanf(char *fmt, ...) {
	va_list ap;
	va_start(ap, fmt);
	int fmt_c;
	int input_c;
	int digit_val;
	char *p;
	int* int_val;

	for(p = fmt; *p; p++) {
		if (*p == '%') {
			switch (*++p) {
				case 'd':
					input_c = read_int();
					int_val = va_arg(ap, int*);
					*int_val = input_c;
					break;
				default:
					break;
			}
		} else {
			if ((input_c = getchar()) == *p) {
				continue;
			} else {
				break;
			}
		}

	}

	va_end(ap);
}

int read_int(){
	int c;
	char raw_int[MAXLEN];
	int cur_idx = 0;
	while(isdigit(c = getchar())){
		raw_int[cur_idx] = c;
		cur_idx++;
	}
	return atoi(raw_int);
}