<template>
    <div class="cookiz-wrapper">
        <!-- Created based on Youtube [CodingLab](https://www.youtube.com/@CodingLabYT)-->

        <!-- ---- Boxicons CSS ---- -->
        <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet" />

        <!--  Codes -->
        <div class="wrapper">
            <div class="title-box">
                <i class="bx bx-cookie"></i>
                <h3>{{ $t('home.cookizHead') }}</h3>
            </div>
            <div class="info">
                <p>
                    {{ $t('home.cookizText') }}

                </p>
            </div>
            <div class="buttons">
                <button class="button" id="acceptBtn">{{ $t('home.accept') }}</button>
                <button class="button decline">{{ $t('home.decline') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        // ---- ---- Const ---- ---- //
        const cookiesBox = document.querySelector('.wrapper'),
            buttons = document.querySelectorAll('.button');

        // ---- ---- Show ---- ---- //
        const executeCodes = () => {
            if (document.cookie.includes('humhum')) return;
            cookiesBox.classList.add('show');

            // ---- ---- Button ---- ---- //
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    cookiesBox.classList.remove('show');

                    // ---- ---- Time ---- ---- //
                    if (button.id == 'acceptBtn') {
                        document.cookie =
                            'cookieBy= humhum; max-age=' + 60 * 60 * 24 * 30;
                    }
                });
            });
        };

        window.addEventListener('load', executeCodes);
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: fixed;
    left: -50%;
    bottom: 50px;
    max-width: 345px;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    padding: 15px 25px 22px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    z-index: 99;
}

.wrapper.show {
    left: 20px;
}

.title-box {
    display: flex;
    align-items: center;
    column-gap: 15px;
    color: $main-color;
    margin-bottom: 15px;
}

.title-box i {
    font-size: 32px;
}

.title-box h3 {
    font-size: 24px;
    font-weight: 500;
}

.info {
    margin-bottom: 15px;
}

.info p {
    font-size: 16px;
    font-weight: 400;
    color: #333;
}

.info p a {
    color: $main-color;
    text-decoration: none;
}

.info p a:hover {
    text-decoration: underline;
}

.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}


.button {
    width: calc(100% / 2 - 10px);
    padding: 8px 0;
    border: none;
    border-radius: 4px;
    background-color: $main-color;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
}

#acceptBtn {
    background: #312620;
}

.button:hover {
    background-color: #312620;
}
</style>