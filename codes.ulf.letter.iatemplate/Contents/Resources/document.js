window.addEventListener('load', function() {

    //Have the addressMap to pre-configure addresses and make them available via a short access key.
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
    const addressMap = new Map();

    const loadAddress = function(s) {
        let address = addressMap.get(s.trim());
        return address ? address : s;
    }


    const formatAddress = function(s) {
        let parts = s.split(/;|\n|<br>/);
        let formatted = '';

        parts.forEach((part, i) => {
            let loadedAddress = loadAddress(part);
            if (loadedAddress != part) {
                part = formatAddress(loadedAddress);
            }

            let trimmedPart = part.trim();

            if (trimmedPart) {
                formatted += trimmedPart;
                if (i < parts.length - 1) {
                    formatted += '<br>';
                }
            }
        });

        return formatted;
    }

    const extractDefinitionListContent = function(key) {
        let dl = document.querySelectorAll('dl');
        let content = '';
        let extract = false;
        for (let l of dl) {
            let elements = l.querySelectorAll('*');
            for (element of elements) {
                if (element.tagName == 'DT' && element.innerHTML == key) {
                    extract = true;
                    element.remove();
                } else if (element.tagName == 'DT') {
                    extract = false;
                } else if (element.tagName == 'DD' && extract) {
                    if (content) {
                        content += '<br>';
                    }
                    content += element.innerHTML;
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

    const insertSender = function(senderMeta, sender) {
        if (senderMeta && sender) {
            address = document.createElement('address');
            address.classList.add('sender');
            senderMeta.appendChild(address);
            address.innerHTML = formatAddress(sender);
        }
    }

    const insertDate = function(senderMeta, date) {
        if (senderMeta && date) {
            time = document.createElement('time');
            senderMeta.appendChild(time);
            time.innerHTML = date;
        }
    }

    const insertSenderMeta = function() {
        let sender = extractDefinitionListContent('@sender');
        let date = extractDefinitionListContent('@date');
        if (sender || date) {
            let senderMeta = document.createElement('div');
            senderMeta.classList.add('sender-meta');
            document.body.insertAdjacentElement('afterbegin', senderMeta);
            insertSender(senderMeta, sender);
            insertDate(senderMeta, date);
            return senderMeta;
        }
    }

    const insertReceiver = function(senderMeta) {
        let receiver = extractDefinitionListContent('@receiver');

        if (receiver) {
            address = document.createElement('address');
            address.classList.add('receiver');
            if (senderMeta) {
                senderMeta.insertAdjacentElement('afterend', address);
            } else {
                document.body.insertAdjacentElement('afterbegin', address);
            }
            address.innerHTML = formatAddress(receiver);
        }
    }

    document.body.addEventListener('ia-writer-change', function() {
        let senderMeta = insertSenderMeta();
        insertReceiver(senderMeta);
    })
})