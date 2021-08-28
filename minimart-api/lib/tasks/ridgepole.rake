namespace :ridgepole do
  desc 'Show difference between schema definition and actual schema'
  task :'dry-run' do
    sh 'ridgepole', '--config', 'config/database.yml',
      '--env', ENV.fetch('RAILS_ENV', 'development'), '--apply', '--dry-run', '--file', 'db/Schemafile'
  end

  desc 'Apply schema definition'
  task :apply do
    sh 'ridgepole', '--config', 'config/database.yml',
      '--env', ENV.fetch('RAILS_ENV', 'development'), '--apply', '--file', 'db/Schemafile'
  end

  desc 'Merge schema definition'
  task :merge do
    sh 'ridgepole', '--config', 'config/database.yml',
      '--env', ENV.fetch('RAILS_ENV', 'development'), '--merge', '--file', 'db/Schemafile'
  end
end
