#include <stdio.h>
#include <stdarg.h>

void minprintf(char *fmt, ...);


int main(int arc, char **argv) {
	minprintf("int - %d\n", 1);
	minprintf("float - %f\n", 1.2);
	minprintf("string - %s\n", "test");
	minprintf("char - %c\n", 'c');
}

void minprintf(char *fmt, ...) {
	va_list ap;
	char *p, *sval;
	int ival;
	double dval;
	char cval;

	va_start(ap, fmt);
	for(p = fmt; *p; p++) {
		if (*p != '%') {
			putchar(*p);
			continue;
		}
		switch(*++p) {
			case 'd':
				ival = va_arg(ap, int);
				printf("%d", ival);
				break;
			case 'f':
				dval = va_arg(ap, double);
				printf("%f", dval);
				break;
			case 'c':
				cval = va_arg(ap, int);
				printf("%c", cval);
				break;
			case 's':
				for(sval = va_arg(ap, char*); *sval; sval++)
					putchar(*sval);
				break;
			default:
				break;
		}
	}
	va_end(ap);
}
