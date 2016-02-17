library(jsonlite)
dat <- fromJSON('data.json')
dat <- dat[,-2]
write.csv(dat, 'data.csv', row.names=FALSE)