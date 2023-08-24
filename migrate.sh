#! /usr/bin/env bash
set +x

host='http://localhost:8180/'
echo 'Waiting for server...'
e=1
while [[ "$e" == "0" ]]; do
	curl --head --no-progress-meter $host | grep 'Server Error'
	e="$?"
	sleep 5
done

data=(
	'{"fname":"tom","lname":"hanks","phone":"+12345678901","bday":"1965-07-09"}'
	'{"fname":"bruce","lname":"willis","phone":"+11234567890","bday":"1955-03-19"}'
	'{"fname":"jack","lname":"black","phone":"+10987654321","bday":"1969-08-28"}'
	'{"fname":"jackie","lname":"chan","phone":"+16789054321","bday":"1954-04-07"}'
	'{"fname":"keanu","lname":"reeves","phone":"+18903216754","bday":"1964-09-02"}'
	'{"fname":"devid","lname":"bowie","phone":"+10912982387","bday":"1947-01-07"}'
	'{"fname":"james","lname":"hetfield","phone":"+15638193563","bday":"1963-08-03"}'
	'{"fname":"mark","lname":"strong","phone":"+15647382917","bday":"1963-08-05"}'
)
for person in "${data[@]}"; do
	curl --no-progress-meter -H 'Content-Type: application/json' -d $person $host | grep 'true' &>/dev/null
	if [[ "$?" != "0" ]]; then
		echo "Fail to post $person"
		echo "Please try one more time. If en error still there, than make an issue please"
		echo "https://github.com/diliapi/test_job/issues/new?title=QA:%20migration%20script%20error"
		exit 1
	fi
done
echo "Migration success"