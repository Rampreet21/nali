#include <stdio.h>
#include <ctype.h>

char stack[100];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }
int priority(char c) { 
    if (c == '+' || c == '-') return 1;
    if (c == '*' || c == '/') return 2;
    return 0;
}

int main() {
    char infix[100], ch;
    int i = 0;
    printf("Enter infix: ");
    scanf("%s", infix);

    while ((ch = infix[i++]) != '\0') {
        if (isalnum(ch)) printf("%c", ch);
        else if (ch == '(') push(ch);
        else if (ch == ')') {
            while (stack[top] != '(') printf("%c", pop());
            pop();
        } else {
            while (top != -1 && priority(stack[top]) >= priority(ch))
                printf("%c", pop());
            push(ch);
        }
    }
    while (top != -1) printf("%c", pop());
    return 0;
}

// output:

// Input:  (A+B)*C
// Output: AB+C*
