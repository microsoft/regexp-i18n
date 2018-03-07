#! /bin/sh
# brew install coreutils to get realpath on mac
SCRIPTPATH=$(realpath "$0")
DIRNAME=$(dirname "$SCRIPTPATH")
BIN="$DIRNAME/bin"
if [[ ! -d $BIN ]]; then
  mkdir $BIN
fi
javac $DIRNAME/*.java -d $BIN
java -cp $BIN com.microsoft.SymbolsRange > $DIRNAME/../src/Constants.ts
