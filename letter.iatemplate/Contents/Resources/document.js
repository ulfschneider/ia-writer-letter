window.addEventListener('load', function () {

    const FROM_KEYS = ['@sender', '@from'];
    const DATE_KEYS = ['@date'];
    const TO_KEYS = ['@receiver', '@recipient', '@to'];

    //Future Idea: Have the addressMap to pre-configure addresses and make them available via a short access key.
    //A semicolon is treated as a new line
    //Example:
    //const addressMap = new Map([
    //    ['ll', 'Lucy Letter; 27 Writing Avenue; 12345 Garden Town'],
    //    ['ee', 'Ernie English; 78 Reading Lane; 34567 Read City']]);
    //
    //Use the the short access key in the markdown text, like:
    //
    //@sender
    //:ll
    //
    //@receiver
    //:ee
    //
    let addressMap = new Map();

    const loadAddress = function (s) {
        let address = addressMap.get(s.trim());
        return address ? address : s;
    }


    const formatAddress = function (s) {
        let parts = s.split(/;|\n|<br>/);
        let formatted = '';

        parts.forEach((part, i) => {
            let loadedAddress = loadAddress(part);
            if (loadedAddress != part) {
                part = formatAddress(loadedAddress);
            }

            let trimmedPart = part.trim();

            if (trimmedPart) {
                formatted += '<div>' + trimmedPart + '</div>';                
            }
        });

        return formatted;
    }

    const extractDefinitionListContent = function (keys) {
        let dl = document.querySelectorAll('dl');
        let content = '';
        let extract = false;
        for (let l of dl) {
            let elements = l.querySelectorAll('*');
            for (element of elements) {
                if (element.tagName == 'DT' && keys.includes(element.innerHTML)) {
                    extract = true;
                    element.remove();
                } else if (element.tagName == 'DT') {
                    extract = false;
                } else if (element.tagName == 'DD' && extract) {
                    content += '<div>' + element.innerHTML + '</div>';
                    element.remove();
                }
            }
        }

        //clean up empty dl´s
        dl = document.querySelectorAll('dl');
        for (l of dl) {
            if (!l.firstChild) {
                l.remove();
            }
        }
        return content;
    }

    const insertSender = function (senderAndDate, sender) {
        if (senderAndDate && sender) {
            address = document.createElement('address');
            address.classList.add('sender');
            address.innerHTML = formatAddress(sender);
            senderAndDate.appendChild(address);
        }
    }

    const insertDate = function (senderAndDate, date) {
        if (senderAndDate && date) {
            time = document.createElement('time');
            time.innerHTML = date;
            senderAndDate.appendChild(time);
        }
    }

    const insertSenderAndDate = function (letterHead, sender, date) {
        if (sender || date) {
            let senderAndDate = document.createElement('div');
            senderAndDate.classList.add('sender-and-date');
            letterHead.insertAdjacentElement('afterbegin', senderAndDate);
            insertSender(senderAndDate, sender);
            insertDate(senderAndDate, date);
        }
    }

    const insertReceiver = function (letterHead, receiver) {
        if (receiver) {
            address = document.createElement('address');
            address.classList.add('receiver');
            address.innerHTML = formatAddress(receiver);
            letterHead.insertAdjacentElement('beforeend', address);
        }
    }

    const insertLetterHead = function () {
        let sender = extractDefinitionListContent(FROM_KEYS);
        let date = extractDefinitionListContent(DATE_KEYS);
        let receiver = extractDefinitionListContent(TO_KEYS);
        if (sender || date || receiver) {
            letterHead = document.createElement('header');
            letterHead.classList.add('letter-head');
            document.body.insertAdjacentElement('afterbegin', letterHead);
            insertSenderAndDate(letterHead, sender, date);
            insertReceiver(letterHead, receiver);
        }
    }

    document.body.addEventListener('ia-writer-change', function () {
        insertLetterHead();
    })
})