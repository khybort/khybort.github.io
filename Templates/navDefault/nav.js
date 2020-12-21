$(document).ready(function(){
    const mobileNav = () => {
        const navdropdown = document.querySelector('.navdropdown');
        const nav = document.querySelector('.navlinks');
        const navlinks = document.querySelectorAll('.navlinks li')

        navdropdown.addEventListener('click', ()=>{
            nav.classList.toggle('nav-active');
            navlinks.forEach((link, index)=>{
                if(link.style.animation){
                    link.style.animation = '';
                }
                else{
                    link.style.animation = `navLinkFade 0.5s ease forwards ${(index / 7) + .15}s`;
                }
            });

            navdropdown.classList.toggle('toggle');
        });
    }

    const smoothScroll= () => {
        var smoothScroll = $('.scroll');

        smoothScroll.click(function(e) {
            e.preventDefault();
            $('body,html').animate({
                scrollTop: $(this.hash).offset().top
            }, 750)
        })
    }


    smoothScroll();
    mobileNav();

});