<!doctype html>
<html lang="ru">

<head>
    <title>Игра «Змейка»</title>
    <meta name="description" content="Игра Змейка" />
    <meta name="author" content="Web-Vluki" />
    <meta name="copyright" content="(c) Web-Vluki" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/css/style.min.css">

    <meta property="og:title" content="Игра Змейка" />
    <meta property="og:description" content="Игра Змейка" />
    <meta property="og:site_name" content="Игра Змейка" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://project-snake.web-vluki.ru/" />
    <meta property="og:image" content="https://project-snake.web-vluki.ru/media/ogimage.jpg" />

    <link rel="apple-touch-icon" sizes="57x57" href="/media/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/media/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/media/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/media/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/media/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/media/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/media/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/media/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/media/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/media/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/media/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/media/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/media/favicon/favicon-16x16.png">
    <link rel="manifest" href="/media/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/media/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
</head>

<body>
    <div class="wrap">
        <div class="game">
            <div class="game__info">
                <h1 class="game__info-title">«Змейка»</h1>
                <div class="game__info-text">
                    <div class="game__info-parameter">
                        <div class="game__info-designation">Шаги</div>
                        <div class="game__info-step">0</div>
                    </div>
                    <div class="game__info-parameter">
                        <div class="game__info-designation">Очки</div>
                        <div class="game__info-points">0</div>
                    </div>
                </div>
                <div class="game__info-footer">Управление: W A S D </div>
            </div>
        </div>

        <script src="/js/script.min.js?"></script>

        <!-- Yandex.Metrika counter -->
        <script type="text/javascript">
            (function(m, e, t, r, i, k, a) {
                m[i] = m[i] || function() {
                    (m[i].a = m[i].a || []).push(arguments)
                };
                m[i].l = 1 * new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) {
                        return;
                    }
                }
                k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(91595822, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
        </script> <noscript>
            <div><img src="https://mc.yandex.ru/watch/91595822" style="position:absolute; left:-9999px;" alt="" /></div>
        </noscript> <!-- /Yandex.Metrika counter -->
</body>

</html>