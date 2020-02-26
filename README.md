# lighthouse-on-lambda

## Environments
### Sheet
https://docs.google.com/spreadsheets/d/1lupynfVgdYJT6dIm2Ff_pPQL5426H4_IX34ZVxLsHsQ/edit#gid=0

### GAS
https://script.google.com/d/1qC41Vn-VJ7YiEV9881xIYjm1RcOGy0hCL0dJuVh0-8r_df_0qQ8mrZub/edit


## Prerequisites
serverless
.envrc


## ローカルで実行

```
node test-runner.js
```

## deploy
```
serverless deploy
```

## remove
```
serverless remove
```

## postinstall
```
yarn postinstall
```

## 便利コマンド

```
# layerの一覧を取得
aws lambda list-layers
```

## Thanks
https://github.com/erezrokah/lighthouse-layer
