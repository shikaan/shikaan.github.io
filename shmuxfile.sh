start: clean
  GEM_HOME=$HOME/.gem bundle exec jekyll serve --incremental --future

clean:
  rm -rf .jekyll-metadata