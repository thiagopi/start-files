/**
 * author: Thiago Pereira Idehama
 * version: 1.6.4
 * 2021-05-18
 */
export default {
    methods: {
        /*
            Verify if is Android
        */
        isAndroid() {
            // Detectar Device
            var ua = navigator.userAgent.toLowerCase();
            var itIs = ua.indexOf('android') > -1; // && ua.indexOf("mobile");

            return itIs;
        },

        /*
            Verify if is iOS
        */
        isiOS() {
            // Detectar Device
            var ios = /iPad|iPhone|iPod/.test(navigator.userAgent);

            // Another way is relying on navigator.platform:
            // var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

            return ios;
        },

        /*
            Verify if is FIREFOX
        */
        isFirefox() {
            if (navigator.userAgent.indexOf('Firefox') > -1) {
                return true;
            }
            return false;
        },

        /*
            Remove all not number
        */
        clearString(s) {
            // console.log('s: ' + s);
            var str = s;
            str = str.replace(/\D/g, '');
            // str = str.replace(".", "");
            // str = str.replace(",", "");
            // str = str.replace("/", "");
            // str = str.replace("-", "");

            return str;
        },
        clearString2(s) {
            // console.log('s: ' + s);
            var str = s;
            str = str.replace(';', '');
            str = str.replace('*', '');

            return str;
        },

        /*
            Deixar o CNPJ só com os números
        */
        limparCNPJ(cnpj) {
            var str = this.remove(cnpj, '.');
            str = this.remove(str, '/');
            str = this.remove(str, '-');

            return str;
        },

        /*
            APLICAR MÁSCARA NA STRING
        */
        applyMaskToString(str, type) {
            switch (type) {
                case 'cep':
                    if (str.length > 10){
                        str = str.slice(0, -1);
                    }
                    //
                    str = str.replace(/\D/g, ''); // Remove tudo o que não é dígito
                    str = str.replace(/^(\d{5})(\d)/, '$1-$2'); // Esse é tão fácil que não merece explicações
                    break;
            }
            return str;
        },
        /*
            Get PHP variables from URL
        */
        getUrlVars(phpvar) {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var c = url.searchParams.get(phpvar);
            return c;
        },

        /*
            String capitalize
        */
        capitalize(str) {
            var s = str.toLowerCase();
            s = s.replace(/\b\w/g, l => l.toUpperCase());
            // s = str[0].toUpperCase() + str.slice(1);
            s = s.replace(' A ', ' a ');
            s = s.replace(' E ', ' e ');
            s = s.replace(' I ', ' i ');
            s = s.replace(' O ', ' o ');
            s = s.replace(' U ', ' u ');

            s = s.replace(' As ', ' as ');
            s = s.replace(' Os ', ' os ');

            s = s.replace(' Á ', ' á ');
            s = s.replace(' É ', ' é ');
            s = s.replace(' À ', ' à ');

            s = s.replace(' Da ', ' da ');
            s = s.replace(' Das ', ' das ');
            s = s.replace(' De ', ' de ');
            s = s.replace(' Do ', ' do ');
            s = s.replace(' Dos ', ' dos ');

            s = s.replace(' Na ', ' na ');
            s = s.replace(' Nas ', ' nas ');
            s = s.replace(' Ne ', ' ne ');
            s = s.replace(' Ni ', ' ni ');
            s = s.replace(' No ', ' no ');
            s = s.replace(' Nos ', ' nos ');
            s = s.replace(' Nu ', ' nu ');

            s = s.replace(' Em ', ' em ');
            s = s.replace(' Sao ', ' São ');
            s = s.replace('Sao ', 'São ');
            s = s.replace('R ', 'Rua ');
            s = s.replace('R. ', 'Rua ');
            s = s.replace('Av ', 'Av. ');
            s = s.replace('Al ', 'Al. ');
            s = s.replace('Braganca', 'Bragança');
            s = s.replace('Tatuape', 'Tatuapé');
            //
            return s;
        },

        /*
            Verify if string has only numbers
        */
        isOnlyNumbers(sText) {
            // var sText;
            var validChars = '0123456789';

            var isNumber = true;

            var char;

            sText += '';

            for (var i = 0; i < sText.length && isNumber === true; i++) {
                char = sText.charAt(i);

                if (validChars.indexOf(char) === -1) {
                    isNumber = false;
                }
            }

            return (isNumber && (sText.length > 0));
        },

        /*
            Remove from string
        */
        remove(str, sub) {
            let i;
            if (str) {
                i = str.indexOf(sub);
            } else {
                i = -1;
            }
            var r = '';
            if (i === -1) {
                return str;
            }
            r += str.substring(0, i) + this.remove(str.substring(i + sub.length), sub);
            return r;
        },

        /*

        */
        padZeros(num, size) {
            var s = num + '';
            while (s.length < size) {
                s = '0' + s;
            }
            return s;
        },

        /*
            Verify valid e-mail address
        */
        verifyEmail(email) {
            const re = /^(([^<>()[]\\.,;:\s@']+(\.[^<>()[]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        /*
            Check valid CPF number
        */
        checkCPF(document) {
            // console.log(document);
            let cpf = this.remove(document, '.');
            cpf = this.remove(cpf, '-');
            cpf = this.padZeros(cpf, 11);
            //
            if (cpf.length !== 11 || cpf === '00000000000' || cpf === '11111111111' ||
                cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' ||
                cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' ||
                cpf === '88888888888' || cpf === '99999999999') {
                    return false;
            }

            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpf.charAt(i), 10) * (10 - i);
            }
            //
            let resto = 11 - (soma % 11);
            if (resto === 10 || resto === 11) {
                resto = 0;
            }
            //
            if (resto !== parseInt(cpf.charAt(9), 10)) {
                return false;
            }
            //
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(cpf.charAt(i), 10) * (11 - i);
            }
            //
            resto = 11 - (soma % 11);
            if (resto === 10 || resto === 11) {
                resto = 0;
            }
            //
            if (resto !== parseInt(cpf.charAt(10), 10)) {
                return false;
            }
            //
            return true;
        },

        /*
            Verify valid CNPJ number
        */
        verifyCNPJ(cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, '');
            if (!cnpj ||
                cnpj.length !== 14 ||
                cnpj === '00000000000000' ||
                cnpj === '11111111111111' ||
                cnpj === '22222222222222' ||
                cnpj === '33333333333333' ||
                cnpj === '44444444444444' ||
                cnpj === '55555555555555' ||
                cnpj === '66666666666666' ||
                cnpj === '77777777777777' ||
                cnpj === '88888888888888' ||
                cnpj === '99999999999999') {
                    return false;
                }
            //
            var tamanho = cnpj.length - 2;
            var numeros = cnpj.substring(0, tamanho);
            var digitos = cnpj.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;
            for (var i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== digitos.charAt(0)) {
                return false;
            }
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== digitos.charAt(1)) {
                return false;
            }
            return true;
        },

        /*
            MASKS
        */
        setMasks(type, field) {
            function mascara(obj, fn) {
                var v_obj = obj;
                var v_fun = fn;
                v_obj.value = v_fun(v_obj.value);
            }

            // CEP
            function mcep(v) {
                if (v.length > 9){
                    v = v.slice(0, -1);
                }
                //
                v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                v = v.replace(/^(\d{5})(\d)/, '$1-$2'); // Esse é tão fácil que não merece explicações
                return v;
            }
            // CNPJ
            function mcnpj(v) {
                // console.log(v);
                v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
                v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
                v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
                v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
                //
                if (v.length > 18){
                    v = v.slice(0, -1);
                }
                //
                return v;
            }
            // CPF
            function mcpf(v) {
                if (v.length > 14){
                    v = v.slice(0, -1);
                }
                //
                v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
                v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
                // de novo (para o segundo bloco de números)
                v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
                //
                return v;
            }
            // Document (CPF and CNPJ)
            function mdocument(v) {
                if (v.length <= 14){
                    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
                    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
                    // de novo (para o segundo bloco de números)
                    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
                    return v;
                } else if (v.length > 14 && v.length < 19) {
                    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
                    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
                    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
                    v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
                    return v;
                } else {
                    return v.replace(v, v.slice(0, -1));
                }
            }
            // DATA
            function mdate(v) {
                if (v.length > 10){
                    v = v.slice(0, -1);
                }
                //
                v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                v = v.replace(/(\d{2})(\d)/, '$1/$2');
                v = v.replace(/(\d{2})(\d)/, '$1/$2');
                v = v.replace(/(\d{2})(\d{2})$/, '$1$2');
                return v;
            }
            // TELEFONE (preparado para o nono dígito)
            function mtel(v) {
                v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                v = v.replace(/^(\d\d)(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
                // console.log(v.length);
                if (v.length < 14) {
                    v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
                } else {
                    v = v.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca hífen entre o quinto e o sexto dígitos
                }
                //
                if (v.length > 15){
                    v = v.slice(0, -1);
                }
                //
                return v;
            }
            // Moeda Real
            function mmoedareal(v) {
                v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
                // v = v.replace(/[^0-9-]/g, ''); // Remove tudo o que não é dígito
                v = v.replace(/([0-9-]{2})$/g, ',$1');
                if (v.length > 6) {
                    v = v.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
                    // v = v.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
                }
                //
                return v;
            }

            // Aplicar a máscara nas IDs e seu tipo
            switch (type) {
                case 'phone_number':
                    field.addEventListener('keyup', () => {
                        mascara(field, mtel);
                    });
                    break;

                case 'cnpj':
                    field.addEventListener('keyup', () => {
                        mascara(field, mcnpj);
                    });
                    break;

                case 'cpf':
                    field.addEventListener('keyup', () => {
                        mascara(field, mcpf);
                    });
                    break;

                case 'document':
                    field.addEventListener('keyup', () => {
                        mascara(field, mdocument);
                    });
                    break;

                case 'cep':
                    field.addEventListener('keyup', () => {
                        mascara(field, mcep);
                    });
                    break;

                case 'date':
                    field.addEventListener('keyup', () => {
                        mascara(field, mdate);
                    });
                    break;

                case 'currency_real':
                    field.addEventListener('keyup', () => {
                        mascara(field, mmoedareal);
                    });
                    break;
            }
        },

        /*
            Scroll page to specific content ID
        */
        // var ativaScroll = true;
        goCont(id, diff = 0) {
            const elem = document.querySelector(id);
            // console.log(elem);
            if (elem.id) {
                // elem.scrollIntoView({ behavior: "smooth" });
                const yOffset = -diff;
                const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        },

        /*
            Verificar senha
        */
        checkPassword(str, tipo) {
            switch (tipo) {
                case 'number':
                    return (/[0-9]/g).test(str);

                case 'uppercase':
                    return (/[A-Z]/g).test(str);

                case 'lowercase':
                    return (/[a-z]/g).test(str);

                case 'symbol':
                    return (/[^a-zA-Z0-9 ]+/).test(str);
                    // return (/[-!@#$%^&*()_+|~=`{}[]:";'<>?,.\]/).test(str);

                case 'repeat':
                    return (/(\d)\1{2}/).test(str); // retorna true a partir de 3 repetições
            }
            //
            return true;
        },

        /*
            DRAG SCROLL
        */
        hasScroll(el, direction) {
            direction = (direction === 'vertical') ? 'scrollTop' : 'scrollLeft';
            var result = !!el[direction];

            if (!result) {
                el[direction] = 1;
                result = !!el[direction];
                el[direction] = 0;
            }
            return result;
        },

        async findZipCode(cep) {
            cep = this.clearString(cep);
            //
            // console.log(dataInit);
            const res = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
            const resCep = await res.json();
            return resCep;
        },

        splitBankAccount(str) {
            let newString;
            //
            if (str.includes('-')) {
              newString = str.split('-');
            } else {
              newString = str;
            }
            //
            return newString;
        },

        formatCurrency(val, lang = 'pt-br') {
            let newVal;
            switch (lang) {
                case 'pt-br':
                    newVal = (val).toLocaleString(lang, { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                    break;

                case 'en-us':
                    newVal = (val).toLocaleString(lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
                    break;
            }
            return newVal;
        },

        // CHANGE BOOLEAN TO STRING FROM ALLOW PHYSICAL CARD
        booleanToYesNo(bool) {
            if (bool) {
            return 'Sim';
            } else {
            return 'Não';
            }
        },

        /*!
        * Find the differences between two objects and push to a new object
        * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
        * @param  {Object} obj1 The original object
        * @param  {Object} obj2 The object to compare against it
        * @return {Object}      An object of differences between the two
        */
        diff(obj1, obj2) {
            // Make sure an object to compare is provided
            if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
                return obj1;
            }

            //
            // Variables
            //

            var diffs = {};
            var key;

            //
            // Methods
            //

            /**
             * Check if two arrays are equal
             * @param  {Array}   arr1 The first array
             * @param  {Array}   arr2 The second array
             * @return {Boolean}      If true, both arrays are equal
             */
            var arraysMatch = function(arr1, arr2) {
                // Check if the arrays are the same length
                if (arr1.length !== arr2.length) {
                    return false;
                }

                // Check if all items exist and are in the same order
                for (var i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) {
                        return false;
                    }
                }

                // Otherwise, return true
                return true;
            };

            /**
             * Compare two items and push non-matches to object
             * @param  {*}      item1 The first item
             * @param  {*}      item2 The second item
             * @param  {String} key   The key in our object
             */
            var compare = function(item1, item2, key) {
                // Get the object type
                var type1 = Object.prototype.toString.call(item1);
                var type2 = Object.prototype.toString.call(item2);

                // If type2 is undefined it has been removed
                if (type2 === '[object Undefined]') {
                    diffs[key] = null;
                    return;
                }

                // If items are different types
                if (type1 !== type2) {
                    diffs[key] = item2;
                    return;
                }

                // If an object, compare recursively
                if (type1 === '[object Object]') {
                    var objDiff = this.diff(item1, item2);
                    if (Object.keys(objDiff).length > 0) {
                        diffs[key] = objDiff;
                    }
                    return;
                }

                // If an array, compare
                if (type1 === '[object Array]') {
                    if (!arraysMatch(item1, item2)) {
                        diffs[key] = item2;
                    }
                    return;
                }

                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (type1 === '[object Function]') {
                    if (item1.toString() !== item2.toString()) {
                        diffs[key] = item2;
                    }
                } else {
                    if (item1 !== item2) {
                        diffs[key] = item2;
                    }
                }
            };

            //
            // Compare our objects
            //

            // Loop through the first object
            for (key in obj1) {
                if (Object.prototype.hasOwnProperty.call(obj1, key)) {
                    compare(obj1[key], obj2[key], key);
                }
            }

            // Loop through the second object and find missing items
            for (key in obj2) {
                if (Object.prototype.hasOwnProperty.call(obj2, key)) {
                    if (!obj1[key] && obj1[key] !== obj2[key]) {
                        diffs[key] = obj2[key];
                    }
                }
            }

            // Return the object of differences
            return diffs;
        },

        /*!
        * Check if an object is empty
        * (c) 2021 Thiago Pereira Idehama, MIT License, https://thiagopi.com.br
        * @param  {Object} obj The object
        * @return Boolean
        */
        isObjectEmpty(obj) {
            return JSON.stringify(obj) === JSON.stringify({});
        },
    },
};
