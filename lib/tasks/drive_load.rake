namespace :drive do
  desc 'ドライブの情報をロード'
  task load: :environment do
    Master::MainImport.import
  end
end