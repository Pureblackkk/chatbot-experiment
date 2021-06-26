import re
sentence = input('please input sentence:')
sentenList = sentence.split(',')
for i in range(len(sentenList)):
    sentenList[i] = re.sub(r'[’‘]*', '', sentenList[i].strip())
print(' | '.join(sentenList))
