VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "trusty64"

  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  config.vm.hostname = "pulsar.dev"

  config.vm.network "private_network", ip: "192.168.13.37"

  config.vm.network :forwarded_port, guest: 22, host: 1234

  config.vm.synced_folder ".", "/var/www/html", :mount_options => ['dmode=777,fmode=666']

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provisioning/playbook.yml"
  end
p
  config.vm.provision "shell", inline: "service apache2 restart", run: "always"

end
