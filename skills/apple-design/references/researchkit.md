# ResearchKit

> A research app lets people everywhere participate in important medical research studies.

**Source**: [Apple Developer Documentation - ResearchKit](https://developer.apple.com/design/human-interface-guidelines/researchkit)

---



![A sketch of the ResearchKit icon. The image is overlaid with rectangular and circular grid lines and is tinted blue to subtly reflect the blue in the original six-color Apple logo.](./images/researchkit/technologies-ResearchKit-intro_2x.png)



The ResearchKit framework provides predesigned screens and transitions that make it easy to design and build an engaging custom research app. For developer guidance, see [Research & Care > ResearchKit](https://www.researchandcare.org/researchkit/).

## Creating the onboarding experience

When opening a research app for the first time, people encounter a series of screens that introduce them to the study, determine their eligibility to participate, request permission to proceed with the study, and, when appropriate, grant access to personal data. These screens aren’t typically revisited once they’ve been completed, so clarity is essential.

**Always display the onboarding screens in the correct order.**



![A diagram showing four boxes in a horizontal row. Beginning with the leftmost box, an arrow pointing toward the right connects each box to the next. From the left, the boxes are labeled Introduction, Eligibility, Informed consent, and Permission to access data.](./images/researchkit/researchkit-diagram_2x.png)



### 1. Introduction

**Provide an introduction that informs and provides a call to action.** Clearly describe the subject and purpose of your study. Also allow existing participants to quickly log in and continue an in-progress study.



![A screenshot that shows a ResearchKit app's introductory screen on iPhone, which invites someone to join a study.](./images/researchkit/introduction-screen_2x.png)



### 2. Determine eligibility

**Determine eligibility as soon as possible.** People don’t need to move on to the consent section if they’re not eligible for the study. Only present eligibility requirements that are necessary for your study. Use simple, straightforward language that describes the requirements, and make it easy to enter information.



![A screenshot that shows a ResearchKit app's eligibility screen on iPhone. The screen includes fields that ask for a person's age, location, and type of smartphone. The bottom of the screen includes 'Back' and 'Submit' buttons, and the top of the screen includes a button for returning to the previous screen and a button for help.](./images/researchkit/eligibility-screen_2x.png)



### 3. Get informed consent

**Make sure participants understand your study before you get their consent.** ResearchKit helps you make the consent process concise and friendly, while still allowing you to incorporate into the consent any legal requirements or requirements set by an institutional review board or ethics review board. Make sure that your app complies with the applicable App Store Guidelines, including the consent requirements. Typically, the consent section explains how the study works, ensures that participants understand the study and their responsibilities, and gets the participant’s consent.

**Break a long consent form into easily digestible sections.** Each section can cover one aspect of the study, such as data gathering, data use, potential benefits, possible risks, time commitment, how to withdraw, and so on. For each section, use simple, straightforward language to provide a high-level overview. If necessary, provide a more detailed explanation of the section that participants can read by tapping a Learn More button. Participants need to be able to view the entire consent form before they agree to participate.

**If it makes sense, provide a quiz that tests the participant’s understanding.** You might do this for questions the participant would otherwise be asked when obtaining consent in person.



![A screenshot that shows a ResearchKit app's quiz screen on iPhone. The screen displays a multiple-choice question designed to make sure people understand the study. The bottom of the screen includes a 'Next' button, and the top of the screen includes a button for returning to the previous screen and a button for help.](./images/researchkit/consent-quiz-screen_2x.png)



**Get the participant’s consent and, if appropriate, some contact information.** After agreeing to join the study, participants receive a confirmation dialog, followed by screens in which they provide their signature and contact details. Most research apps email participants a PDF version of the consent form for their records.



![A screenshot that shows a ResearchKit app's consent screen on iPhone. The screen recaps key points about the study, shows the person's name, and asks the person to confirm whether they'd like to participate in the study. The bottom of the screen includes 'Disagree' and 'Accept' buttons, and the top of the screen includes a button for returning to the previous screen and a button for help.](./images/researchkit/consent-signature-screen_2x.png)



### 4. Request permission to access data

**Get permission to access the participant’s device or data, and to send notifications.** Clearly explain why your research app needs access to location, Health, or other data, and don’t request access to data that isn’t critical to your study. If your app requires it, also ask for permission to send notifications to the participant’s device.



![A screenshot that shows a ResearchKit app's consent screen on iPhone. The screen recaps key points about the study, and offers the choice to share data with researchers for future research purposes, or only for this particular study. The bottom of the screen includes an 'Accept' button, and the top of the screen includes a button for returning to the previous screen and a button for help.](./images/researchkit/permissions-health-data-screen_2x.png)



## Conducting research

To get input from participants, your study might use surveys, active tasks, or a combination of both. Depending on the architecture of your study, participants may interact with each section multiple times or only once.

**Create surveys that keep participants engaged.** ResearchKit provides many customizable screens you can use in your surveys, and makes it easy to present questions that require different types of answers, such as true or false, multiple choice, dates and times, sliding scales, and open-ended text entry. As you use ResearchKit screens to design a survey, follow these guidelines to provide a great experience:

- Tell participants how many questions there are and about how long the survey will take.
- Use one screen per question.
- Show participants their progress in the survey.
- Keep the survey as short as possible. Several short surveys tend to work better than one long survey.
- For questions that require some additional explanation, use the standard font for the question and a slightly smaller font for the explanatory text.
- Tell participants when the survey is complete.



![A screenshot that shows a ResearchKit app's survey screen on iPhone. This particular screen asks someone to specify Parkinson's disease symptoms from a list and tap a 'Next' button to continue the survey. The top of the screen includes a 'Close' button.](./images/researchkit/survey-question-type1-screen_2x.png)



**Make active tasks easy to understand.** An active task requires the participant to engage in an activity, such as speaking into the microphone, tapping fingers on the screen, walking, or performing a memory test. Follow these guidelines to encourage participants to perform an active task and give them the best chance of success:

- Describe how to perform the task using clear, simple language.
- Explain any requirements, such as if the task must be performed at a particular time or under specific circumstances.
- Make sure participants can tell when the task is complete.



![A screenshot that shows a ResearchKit app's active task screen on iPhone. This particular screen shows an illustration of a person walking, and instructions that explain how to perform a Walk and Balance active task. A list of requirements is shown, along with a 'Get started' button. The top of the screen includes a 'Close' button.](./images/researchkit/active-tasks-screen_2x.png)



## Managing personal information and providing encouragement

ResearchKit offers a profile screen you can use to let participants manage personal information while they’re in your research app. It’s also a good idea to design a custom screen that motivates people and gives them a way to track progress in the study. Ideally, both screens are accessible at all times in your app.

**Use a profile to help participants manage personal data related to your study.** A profile screen can let people edit data that might change during the course of the study — such as weight or sleep habits — and remind them of upcoming activities. A profile screen can also provide an easy way to leave a study and view important information, such as the consent document and privacy policy.



![A screenshot that shows a ResearchKit app's profile screen on iPhone. This particular screen includes a list of fields for personal information like name and birth year. Each field includes a button for editing the field's value. The top of the screen includes a settings button, and the bottom of the screen includes tabs for 'Tracking', 'History' and 'Profile'. The active tab is 'Profile'.](./images/researchkit/profile-screen_2x.png)



**Use a dashboard to show progress and motivate participants to continue.** If appropriate for your study, use a dashboard to provide encouraging feedback, such as daily progress, weekly assessments, results from specific activities, and even results that compare the participant’s results with aggregated results from others in the study.



![A screenshot that shows a ResearchKit app's history screen on iPhone. This particular screen shows a log of active tasks performed over two days. The bottom of the screen includes tabs for 'Tracking', 'History' and 'Profile'. The active tab is 'History'.](./images/researchkit/dashboard-screen_2x.png)



## Platform considerations

*No additional considerations for iOS or iPadOS. Not supported in macOS, tvOS, visionOS, or watchOS.*

## Resources

#### Related

[Research & Care > ResearchKit](https://www.researchandcare.org/researchkit/)

#### Developer documentation

[Research & Care > Developers](https://www.researchandcare.org/developers/)

[Protecting user privacy](https://developer.apple.com/documentation/healthkit/protecting-user-privacy) — HealthKit

[ResearchKit GitHub project](https://github.com/ResearchKit/ResearchKit)

#### Videos

## Change log

|   |   |   |
| --- | --- | --- |
|   |   |
|   |   |

