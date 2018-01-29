#! /bin/sh

SCRIPTPATH=$(realpath "$0")
DIRNAME=$(dirname "$SCRIPTPATH")
BIN="$DIRNAME/bin"
if [[ ! -d $BIN ]]; then
  mkdir $SCRIPTPATH/bin
fi
javac $DIRNAME/*.java -d $BIN
java -cp $BIN SymbolsRange
