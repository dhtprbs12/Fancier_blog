$(document).ready(function() {
    $('#sendMessageButton').click(function() {
        $('#contactForm').attr('action',
        'mailto:sekyunoh@email.arizona.edu?subject=' +
        $('#name').val() + '&body=' + $('#message').val());
        $('#contactForm').submit();
    });
});
