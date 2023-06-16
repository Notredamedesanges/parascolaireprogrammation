controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 5 . . . . . 
        . . . 5 5 . . . . 5 5 . . . . . 
        . . . . 5 . . . . 5 . . . . . . 
        . . . . . 5 5 5 5 5 . . . . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . 5 . . 5 5 5 5 5 5 5 5 5 . . . 
        . 5 5 5 5 5 5 5 5 5 5 . . 5 5 . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . . 5 5 5 5 5 . . . . . . 
        . . . . 5 5 . . . 5 5 . . . . . 
        . . . . 5 . . . . . 5 . . . . . 
        . . . . . . . . . . . 5 . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, 50, 0)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 3010, 1, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.vy = -100
    music.play(music.createSoundEffect(WaveShape.Sine, 2038, 2501, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
function niveau2 () {
    tiles.setCurrentTilemap(tilemap`level1`)
    hero = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 5 5 5 5 5 . . . . 
        . . . . 5 5 5 5 5 5 5 f f . . . 
        . . 5 5 5 5 5 5 5 5 5 4 4 . . . 
        . . 5 5 5 5 5 5 5 5 5 4 4 4 4 4 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . f . 5 5 5 5 . f . . . . 
        . . . . f . . . . . . f . . . . 
        . . . . f f . . . . . f f . . . 
        `, SpriteKind.Player)
    controller.moveSprite(hero, 100, 0)
    hero.setPosition(9, 6)
    scene.cameraFollowSprite(hero)
    hero.ay = 200
    info.setLife(5)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    game.gameOver(true)
})
info.onLifeZero(function () {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 500)
    info.changeScoreBy(1)
    if (info.score() == 5) {
        niveau2()
    }
})
let ennemi1: Sprite = null
let projectile: Sprite = null
let hero: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 5 5 5 . . . . 
    . . . . 5 5 5 5 5 5 5 f f . . . 
    . . 5 5 5 5 5 5 5 5 5 4 4 . . . 
    . . 5 5 5 5 5 5 5 5 5 4 4 4 4 4 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . . f . 5 5 5 5 . f . . . . 
    . . . . f . . . . . . f . . . . 
    . . . . f f . . . . . f f . . . 
    `, SpriteKind.Player)
controller.moveSprite(hero, 100, 0)
hero.setPosition(9, 6)
scene.cameraFollowSprite(hero)
hero.ay = 200
info.setLife(5)
game.onUpdateInterval(5000, function () {
    ennemi1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . b f f f b . . . . . . 
        . . . . . f f f f b . . . . . . 
        . . . . . . f f f b b . . . . . 
        . . . . b . b . . b b . . . . . 
        . . . . . b . . . . b . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    ennemi1.follow(hero, 40)
})
