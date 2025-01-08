#!/bin/sh

# Dockerfile copies this script to /docker-entrypoint.d/ so that it runs before nginx

# Define the variable prefix for environment variables
VAR_PREFIX="HC_CONFIG_"
OS_TYPE=$(uname)
SED_CMD="sed -i"

# Function to log messages
log_message() {
    echo "HC CONFIG -- $1"
}

if [ "$OS_TYPE" = "Linux" ]; then
  log_message "OS is [${OS_TYPE}], using Linux/GNU/nginx/alpine sed syntax [${SED_CMD}]"
else
  SED_CMD="sed -i .sed.bak"
  log_message "OS is [${OS_TYPE}], using macOS/BSD sed syntax [${SED_CMD}]"
fi

# Check if a filename argument is provided
FILE="/usr/share/nginx/html/hc-config.json5"
if [ -z "$1" ]; then
    log_message "Filename argument is missing, using default [${FILE}]"
else
    FILE=$1
    log_message "Filename argument [${FILE}]"
fi

# Validate if the file exists
if [ ! -f "$FILE" ]; then
    log_message "File '$FILE' does not exist."
    exit 1
fi

# Make a backup of the file
BACKUP="${FILE}.bak"
cp -p "$FILE" "$BACKUP"
log_message "Backup created: $BACKUP"

# Process environment variables starting with HC_CONFIG_
for VAR in $(env | grep "^$VAR_PREFIX" | awk -F= '{print $1}'); do
    VALUE=$(printenv "$VAR")
    # Extract the matching group by removing the prefix
    TOKEN="%$(echo "$VAR" | sed "s/^$VAR_PREFIX//")%"

    log_message "Processing env var: var=[$VAR] token=[$TOKEN] value=[$VALUE]"

    # Replace occurrences of the token in the file with the env var value
    $SED_CMD "s|$TOKEN|$VALUE|g" "$FILE"

    # Check if sed succeeded
    if [ $? -ne 0 ]; then
      log_message "Error: sed failed to process token [$TOKEN] in file [$FILE]."
      exit 1
    fi
done

log_message "File updated: $FILE"
exit 0
