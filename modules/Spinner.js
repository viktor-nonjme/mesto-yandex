class Spinner {
    constructor(container, spinner) {
        this.container = container;
        this.spinner = spinner;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this.spinner.classList
            .add('spinner_visible');
            this.container.classList
            .add('content_hidden');
        } else {
            this.spinner.classList
            .remove('spinner_visible');
            this.container.classList
            .remove('content_hidden');
        }
    }
}