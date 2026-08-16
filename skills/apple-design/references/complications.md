# Complications

> A complication displays timely, relevant information on the watch face, where people can view it each time they raise their wrist.

**Source**: [Apple Developer Documentation - Complications](https://developer.apple.com/design/human-interface-guidelines/complications)

---



![A stylized representation of an Apple Watch face that includes the time and a set of differently sized complications with labels. The image is tinted red to subtly reflect the red in the original six-color Apple logo.](./images/complications/components-complications-intro_2x.png)



People often prefer apps that provide multiple, powerful complications, because it gives them quick ways to view the data they care about, even when they don’t open the app.

Most watch faces can display at least one complication; some can display four or more.

Starting in watchOS 9, the system organizes complications (also known as *accessories*) into several families — like [circular](https://developer.apple.com/design/human-interface-guidelines/complications#Circular) and [inline](https://developer.apple.com/design/human-interface-guidelines/complications#Inline) — and defines some recommended layouts you can use to display your complication data. A watch face can specify the family it supports in each complication slot. Complications that work in earlier versions of watchOS can use the [legacy templates](https://developer.apple.com/design/human-interface-guidelines/complications#Legacy-templates), which define nongraphic complication styles that don’t take on a wearer’s selected color.

> [!NOTE]
> Prefer using [WidgetKit](https://developer.apple.com/documentation/widgetkit) to develop complications for watchOS 9 and later. For guidance, see [Migrating ClockKit complications to WidgetKit](https://developer.apple.com/documentation/widgetkit/converting-a-clockkit-app). To support earlier versions of watchOS, continue to implement the ClockKit complication data source protocol (see [CLKComplicationDataSource](https://developer.apple.com/documentation/clockkit/clkcomplicationdatasource)).

## Best practices

**Identify essential, dynamic content that people want to view at a glance.** Although people can use a complication to quickly launch an app, the complication behavior they appreciate more is the display of relevant information that always feels up to date. A static complication that doesn’t display meaningful data may be less likely to remain in a prominent position on the watch face.

**Support all complication families when possible.** Supporting more families means that your complications are available on more watch faces. If you can’t display useful information for a particular complication family, provide an image that represents your app — like your app icon — that still lets people launch your app from the watch face.

**Consider creating multiple complications for each family.** Supporting multiple complications helps you take advantage of shareable watch faces and lets people configure a watch face that’s centered on an app they love. For example, an app that helps people train for triathlons could offer three circular complications — one for each segment of the race — each of which deep-links to the segment-specific area in the app. This app could also offer a shareable watch face that’s preconfigured to include its swimming, biking, and running complications and to use its custom images and colors. When people choose this watch face, they don’t have to do any configuration before they can start using it. For guidance, see [Watch faces](https://developer.apple.com/design/human-interface-guidelines/watch-faces).

**Define a different deep link for each complication you support.** It works well when each complication opens your app to the most relevant area. If all the complications you support open the same area in your app, they can seem less useful.

**Keep privacy in mind.** With the Always-On Retina display, information on the watch face might be visible to people other than the wearer. Make sure you help people prevent potentially sensitive information from being visible to others. For guidance, see [Always On](https://developer.apple.com/design/human-interface-guidelines/always-on).

**Carefully consider when to update data.** You provide a complication’s data in the form of a timeline where each entry has a value that specifies the time at which to display your data on the watch face. Different data sets might require different time values. For example, a meeting app might display information about an upcoming meeting an hour before the meeting starts, but a weather app might display forecast information at the time those conditions are expected to occur. You can update the timeline a limited number of times each day, and the system stores a limited number of timeline entries for each app, so you need to choose times that enhance the usefulness of your data. For developer guidance, see [Migrating ClockKit complications to WidgetKit](https://developer.apple.com/documentation/widgetkit/converting-a-clockkit-app).

## Visual design

**Choose a ring or gauge style based on the data you need to display.** Many families support a ring or gauge layout that provides consistent ways to represent numerical values that can change over time. For example:

- The closed style can convey a value that’s a percentage of a whole, such as for a battery gauge.
- The open style works well when the minimum and maximum values are arbitrary — or don’t represent a percentage of the whole — like for a speed indicator.
- Similar to the open style, the segmented style also displays values within an app-defined range, and can convey rapid value changes, such as in the Noise complication.

**Make sure images look good in tinted mode.** In tinted mode, the system applies a solid color to a complication’s text, gauges, and images, and desaturates full-color images unless you provide tinted versions of them. For developer guidance, see [WidgetRenderingMode](https://developer.apple.com/documentation/widgetkit/widgetrenderingmode). (If you’re using legacy templates, tinted mode applies only to graphic complications.) To help your complications perform well in tinted mode:

- Avoid using color as the only way to communicate important information. You want people to get the same information in tinted mode as they do in nontinted mode.
- When necessary, provide an alternative tinted-mode version of a full-color image. If your full-color image doesn’t look good when it’s desaturated, you can supply a different version of the image for the system to use in tinted mode.

**Recognize that people might prefer to use tinted mode for complications, instead of viewing them in full color.** When people choose tinted mode, the system automatically desaturates your complication, converting it to grayscale and tinting its images, gauges, and text using a single color that’s based on the wearer’s selected color.

**When creating complication content, generally use line widths of two points or greater.** Thinner lines can be difficult to see at a glance, especially when the wearer is in motion. Use line weights that suit the size and complexity of the image.

**Provide a set of static placeholder images for each complication you support.** The system uses placeholder images when there’s no other content to display for your complication’s data. For example, when people first install your app, the system can display a static placeholder while it checks to see if your app can generate a localized placeholder to use instead. Placeholder images can also appear in the carousel from which people select complications. Note that complication image sizes vary per layout (and per legacy template) and the size of a placeholder image may not match the size of the actual image you supply for that complication. For developer guidance, see [placeholder(in:)](https://developer.apple.com/documentation/widgetkit/timelineprovider/placeholder(in:)).

## Circular

Circular layouts can include text, gauges, and full-color images in circular areas on the Infograph and Infograph Modular watch faces. The circular family also defines extra-large layouts for displaying content on the X-Large watch face.

You can also add text to accompany a regular-size circular image, using a design that curves the text along the bezel of some watch faces, like Infograph. The text can fill nearly 180 degrees of the bezel before truncating.



![A line of white text that appears to follow the curve of the upper third of a circle. The text reads 8:00 AM yoga, flow studio. Centered below the text is the calendar date friday twenty-three displayed in a circular area.](./images/complications/bezel-circular-text_2x.png)



As you design images for a regular-size circular complication, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

> [!NOTE]
> The system applies a circular mask to each image.

A SwiftUI view that implements a regular-size circular complication uses the following default text values:

- Style: Rounded
- Weight: Medium
- Text size: 12 pt (40mm), 12.5 pt (41mm), 13 pt (44mm), 14.5 pt (45mm/49mm)

If you want to design an oversized treatment of important information that can appear on the X-Large watch face — for example, the Contacts complication, which features a contact photo — use the extra-large versions of the circular family’s layouts. The following layouts let you display full-color images, text, and gauges in a large circular region that fills most of the X-Large watch face. Some of the text fields can support multicolor text.

Use the following values for guidance as you create images for an extra-large circular complication.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

> [!NOTE]
> The system applies a circular mask to the circular, open-gauge, and closed-gauge images.

Use the following values to create no-content placeholder images for your circular-family complications.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

A SwiftUI view that implements an extra-large circular layout uses the following default text values:

- Style: Rounded
- Weight: Medium
- Text size: 34.5 pt (40mm), 36.5 pt (41mm), 36.5 pt (44mm), 41 pt (45mm/49mm)

## Corner

Corner layouts let you display full-color images, text, and gauges in the corners of the watch face, like Infograph. Some of the templates also support multicolor text.

As you design images for a corner complication, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

> [!NOTE]
> The system applies a circular mask to each image.

Use the following values to create no-content placeholder images for your corner-family complications.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |
|   |   |   |   |   |

A SwiftUI view that implements a corner layout uses the following default text values:

- Style: Rounded
- Weight: Semibold
- Text size: 10 pt (40mm), 10.5 pt (41mm), 11 pt (44mm), 12 pt (45mm/49mm)

## Inline

Inline layouts include utilitarian small and large layouts.

Utilitarian small layouts are intended to occupy a rectangular area in the corner of a watch face, such as the Chronograph and Simple watch faces. The content can include an image, interface icon, or a circular graph.

As you design images for a utilitarian small layout, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

The utilitarian large layout is primarily text-based, but also supports an interface icon placed on the leading side of the text. This layout spans the bottom of a watch face, like the Utility or Motion watch faces.



![The text eleven AM photo shoot displayed on one line in a large text size.](./images/complications/complication-utility-large-flat_2x.png)



As you design images for a utilitarian large layout, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

## Rectangular

Rectangular layouts can display full-color images, text, a gauge, and an optional title in a large rectangular region. Some of the text fields can support multicolor text.

The large rectangular region works well for showing details about a value or process that changes over time, because it provides room for information-rich charts, graphs, and diagrams. For example, the Heart Rate complication displays a graph of heart-rate values within a 24-hour period. The graph uses high-contrast white and red for the primary content and a lower-contrast gray for the graph lines and labels, making the data easy to understand at a glance.

Starting with watchOS 10, if you have created a rectangular layout for your watchOS app, the system may display it in the Smart Stack. You can optimize this presentation in a few ways:

- By supplying background color or content that communicates information or aids in recognition
- By using [intents](https://developer.apple.com/documentation/appintents/app-intents) to specify relevancy, and help ensure that your widget is displayed in the Smart Stack at times that are most appropriate and useful to people
- By creating a custom layout of your information that is optimized for the Smart Stack

For developer guidance, see [WidgetFamily.accessoryRectangular](https://developer.apple.com/documentation/widgetkit/widgetfamily/accessoryrectangular). See [Widgets](https://developer.apple.com/design/human-interface-guidelines/widgets) for additional guidance on designing widgets for the Smart Stack.

Use the following values for guidance as you create images for a rectangular layout.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

> [!NOTE]
> Both large-image layouts automatically include a four-point corner radius.

A SwiftUI view that implements a rectangular layout uses the following default text values:

- Style: Rounded
- Weight: Medium
- Text size: 16.5 pt (40mm), 17.5 pt (41mm), 18 pt (44mm), 19.5 pt (45mm/49mm)

## Legacy templates

### Circular small

Circular small templates display a small image or a few characters of text. They appear in the corner of the watch face (for example, in the Color watch face).

As you design images for a circular small complication, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

> [!NOTE]
> In each stack measurement, the width value represents the maximum size.

### Modular small

Modular small templates display two stacked rows consisting of an icon and content, a circular graph, or a single larger item (for example, the bottom row of complications on the Modular watch face).

As you design icons and images for a modular small complication, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

> [!NOTE]
> In each stack measurement, the width value represents the maximum size.

### Modular large

Modular large templates offer a large canvas for displaying up to three rows of content (for example, in the center of the Modular watch face).

As you design icons and images for a modular large complication, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

### Extra large

Extra large templates display larger text and images (for example, on the X-Large watch faces).

As you design icons and images for an extra large complication, use the following values for guidance.

|   |   |   |
| --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

> [!NOTE]
> In each stack measurement, the width value represents the maximum size.

## Platform considerations

*Not supported in iOS, iPadOS, macOS, tvOS, or visionOS.*

## Resources

#### Related

[Watch faces](https://developer.apple.com/design/human-interface-guidelines/watch-faces)

#### Developer documentation

[WidgetKit](https://developer.apple.com/documentation/widgetkit)

#### Videos

## Change log

|   |   |   |
| --- | --- | --- |
|   |   |
|   |   |
|   |   |
|   |   |

