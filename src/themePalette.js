const themePalette = prefersDarkMode => ({
    palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        background: {
            paper: prefersDarkMode ? '#3f3f3f' : '#fff',
            default: prefersDarkMode ? '#1f1f1f' : '#ebebeb'
        }
    }
});

export default themePalette;
