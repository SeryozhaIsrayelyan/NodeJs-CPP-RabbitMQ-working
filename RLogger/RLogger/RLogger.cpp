#include <stdlib.h>
#include <stdio.h>
#include "SimpleAmqpClient/SimpleAmqpClient.h"
#include <iostream>
#include "SimpleSubscriber.h"
#include <boost/make_shared.hpp>

using namespace AmqpClient;
using namespace std;
int main()
{
	char* szBroker = getenv("AMQP_BROKER");
	Channel::ptr_t channel;
	if (szBroker != NULL)
		channel = Channel::Create(szBroker);
	else
		channel = Channel::Create("localhost", 5672);

	boost::shared_ptr<SimpleSubscriber> pub = SimpleSubscriber::Create(channel, "wt");

	while (1)
	{
		string a;

		Envelope::ptr_t envelope;
		bool flag = channel->BasicConsumeMessage("Rqueue", envelope, 7000);
		if (flag == false)
		{
			cout << "timeout\n" << endl;
			break;
		}

		a = envelope->Message()->Body();

		cout << a << endl;

	}

} // It's a SimpleAMQPClient example for testing.