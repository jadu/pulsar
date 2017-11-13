---
layout: page
title: Email Styleguide
---

Our software often has to email our users to get them to do something, or to let them know that something has happened. The information that you—as a developer—should include in the emails should be clear, brief, and generally friendly in their tone of voice.

Remember that writing is user experience design too, the words and language you use in your emails should be carefully considered and peer reviewed just like your code.

## Who sends the email?

There are either two or three parties involved in any given message.

The System -> The Subject

The Agent -> The System -> The Subject

#### The Subject

The user receiving the message.

#### The Agent

Another user whos action triggers an email to the subject.

#### The System

The Continuum platform sends emails to the subject when certain events are triggered automatically or based on actions by the Agent.

The system is always the sender of email notifications and messages should be written from the systems perspective. The system should never imitate the agent.

(Note: The system is not the  'Webmaster', system-generated emails should not come from the Webmaster.)

eg:

###### Good
{% raw %}
```twig
Hello {{ subject_name }},

Your password has been reset.
```
```twig
Hello {{ subject_name }},

{{ agent_name }} has unlocked a content item.
```
{% endraw %}

###### Bad

{% raw %}
```twig
Hello {{ subject_name }},

I have unlocked a content item.

Agent.
```
{% endraw %}

## Subject line

This is, by far, the most important component of your email. It needs to communicate the reason for the email in as few words as possible to let the user decide whether or not the rest of the email requires action, or is even worth their time.

###### Do

* Add the site name at the end of the subject line when dealing with multiple sites
* Use as few words as possible

###### Do not

* Include a trailing full stop

###### Example subject lines

* Please confirm your email address - {domain}
* Your password has been reset - {domain}
* New support case {ref}
* New message from {user}
* Your content has been approved - {domain}
* Your content has been rejected - {domain}
* Your scheduled content has been published - {domain}

## Email body

###### Do

* Tell the user what caused the email
* Be clear about any action they need to take
* Try to provide extra summarised detail to help the user decide whether or not they need to click through to their Continuum software
* Show which user has triggered the email (the agent)
* Consider mobile first, design your words for extremely short attention spans

###### Do not

* Use 'click here' links

## Call to action

Almost all emails should contain a main call to action, try to make these as useful and specific as possible.

If your email is telling the user about something like a new case in CXM you should link directly to the case; If the email is about a comment to a case, you should show some details and link directly to the comment rather than just the case.

It's extremely handy for some actions to be performed by the call to action directly, such as asking the user to confirm their email address, hitting the call to action should actually perform the confirmation rather than asking them to sign in and hit another button. For some actions you might prefer the user to sign in first, like confirming a password reset or deleting critical information.


## HTML templates

Email templates are built and distributed from within Pulsar, products can then take the templates and implement as they see fit. Products are responsible for inserting the correct links as well as content into the templates.

HTML templates are available in the Pulsar repository in `/emails/templates/`. Products using a Pulsar gruntfile should update their `copy:pulsar_dist` task to include these in their Pulsar bundle.

### Simple message

###### Examples of when to use:

* Email confirmation
* Password reset

![Email simple example]({{ site.baseurl }}/assets/image_examples/email-simple-example.png)

### Detailed message

Use when you want to tell the user that something has happened, and also give brief information that helps them decide if they need to take action now, or whether it can wait until later.

###### Examples of when to use:

* A new task that the user needs to complete, or be aware of
* Scheduled content going live
* New CXM case submission, or changes to a case

![Email detail example]({{ site.baseurl }}/assets/image_examples/email-detail-example.png)
