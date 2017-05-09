#include <stdio.h>

int mgetline(char *s, int lim)
{
    int c;
    char *t=s;

    while(--lim >0 && (c=getchar())!=EOF && c!='\n')
        *s++ = c;
    if( c == '\n')
        *s++ = c;

    return s-t;
}