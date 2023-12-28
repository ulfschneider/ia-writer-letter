<figure>
<img src="/img/ia-writer-letter-editor-print-aside.jpg" alt="The iA Writer editor and a formatted letter side by side.">
<figcaption><em>Letter</em> is a <a href="https://ia.net/downloads#templates">iA Writer template</a> to create letters with correctly positioned address fields.</figcaption>
</figure>

## Install

1. [Download the template](https://github.com/ulfschneider/ia-writer-letter/archive/refs/heads/master.zip).
2. Open the folder named <code>ia-writer-letter-master</code>.
3. Double-click on the _bundle_ named <code>letter.iatemplate</code>. The bundle will then be installed inside of iA Writer. Please refer to [iA-Writer-Templates](https://github.com/iainc/iA-Writer-Templates) for further information.

## A sample letter

See below a markdown-formatted letter in the iA Writer editor, with indication for the _sender-address,_ the _receiver-address,_ and the _date_ of writing. The sample text is taken from [Purdue Online Writing Lab](https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/basic_business_letters/sample_letters.html).

<figure>
<img src="/img/ia-writer-letter-editor.jpg" alt="A markdown-formatted letter in the iA Writer editor, with indication for the sender-address, the receiver-address, and the date of writing.">
</figure>

The _Letter_ template will render the text with the _iA Writer Quattro_ typeface. It´s assumed letters are printed on DIN A4 paper or anything of roughly the same size. The sender, receiver, and the date of writing will be positioned correctly when printing the text with the _Letter_ template. See below how the above text is formatted by the _Letter_ template.

<figure>
<img src="/img/ia-writer-letter-print.jpg" style="border:1px solid gray" alt="A formatted letter.">
</figure>

## The editor

Indicate the sender, recipient, and date of writing with the following syntax in the iA Writer editor. Please mind the _empty lines before and after each data entry._

```markdown
@sender
:Lucy Letter
:27 Writing Avenue
:12345 Garden Town

@receiver
:Ernie English
:78 Reading Lane
:34567 Read City

@date
:April 15, 2021
```

- Instead of the `@sender` keyword, `@from` can be used as well.
- Instead of the `@receiver` keyword, `@recipient` and `@to` can be used alternatively.

## Use

- In iA Writer, click the **play** button at the top right of the editor to open the preview pane.
- At the bottom of the preview pane select the template to use. Select **Letter**.
- The selected template will be used for the printing of the text.

## Issues

Please file issues on the [GitHub page](https://github.com/ulfschneider/ia-writer-letter/issues) of _Letter._
