export default class FormValidator {
    constructor(form, ERRORS) {
        this.form = form;
        this.ERRORS = ERRORS;
    }
    checkInputValidity(input, error) {

        if (input.validity.tooShort) {
            return error.textContent = this.ERRORS.tooShort;
        }

        if (input.validity.valueMissing) {
            return error.textContent = this.ERRORS.valueMissing;
        }

        if (input.validity.typeMismatch) {
            return error.textContent = this.ERRORS.typeMismatch;
        }

        return error.textContent = '';
    }
    setSubmitButtonState() {
        const { submit } = this.form.elements; 

        if (this.form.checkValidity()) {
            submit.removeAttribute('disabled');

        } else {
            submit.setAttribute('disabled', true);
        }
    }
    setEventListeners() {
        this.form.addEventListener('input', (event) => {
            this.checkInputValidity(
                event.target, 
                event.target.nextElementSibling
                );
            this.setSubmitButtonState();
        })
    }
    resetError() {
        const errors = this.form
        .querySelectorAll('.popup__error');
        
        errors.forEach(err => {
            err.textContent = '';
          })
    }
}