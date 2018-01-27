#!/usr/bin/env python

def code(val):
  code =  hex(val)[2:]
  while (len(code) != 4):
    code = '0' + code
  return code

result = ''
max = pow(2, 16)
i = 0;
first_alpha = -1
last_alpha = -1
cur_char = unichr(0)
while(i < max):
  while(i < max):
    cur_char = unichr(i)
    if (cur_char.isalpha()):
      first_alpha = last_alpha  = i
      break
    i += 1
  
  while(i < max):
    i+=1
    cur_char = unichr(i)
    if (not cur_char.isalpha()):
      last_alpha = i-1
      if last_alpha != first_alpha:
        result += '\\u' + code(first_alpha) + '-' + '\\u' + code(last_alpha)
      else:
        result += '\\u'+code(first_alpha)
      break

print(result)

