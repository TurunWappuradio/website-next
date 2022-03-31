
# Remove .html extensions from files.
for FILE in `find out -name *.html`; do 
  # If a directory with the same name exists, move the file into it.
  if [ -d "${FILE%.html}" ]; then
    mv $FILE ${FILE%.html}/index.html
  else
    mv $FILE ${FILE%.html}
  fi
done