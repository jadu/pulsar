<?php

namespace Jadu\Pulsar\Twig\Extension;

class ConfigExtensionTest extends \PHPUnit\Framework\TestCase
{
    public $config;
    public $ext;

    public function setUp(): void
    {
        parent::setUp();
        $this->config = 'pulsar.json';
        $this->ext = new ConfigExtension($this->config);   
    }

    public function testGetName()
    {
        $this->assertEquals('config_extension', $this->ext->getName());
    }

    public function testConfigFileExists()
    {
        $this->assertFileExists('pulsar.json');
    }

    public function testConfigFileContainsNameProperty()
    {
        $file = file_get_contents('pulsar.json');
        $this->assertStringContainsString('name', $file);
    }

    public function testGetConfigVarsMethodReturnsName()
    {
        $this->assertArrayHasKey('name', $this->ext->getConfigVars($this->config));
    }

    public function testConfigFileIsValidJson()
    {
        $file = file_get_contents('pulsar.json');
        $this->assertNotEquals(NULL, json_decode($file));
    }

    public function testConfigFileContainsVersionNumberProperty()
    {
        $file = file_get_contents('pulsar.json');
        $this->assertStringContainsString('version', $file);
    }

    public function testGetConfigVarsMethodReturnsVersionNumber()
    {
        $this->assertArrayHasKey('version', $this->ext->getConfigVars($this->config));
    }

    public function testConfigFileContainsBasePathProperty()
    {
        $file = file_get_contents('pulsar.json');
        $this->assertStringContainsString('base_path', $file);
    }

    public function testGetConfigVarsMethodReturnsBasePath()
    {
        $this->assertArrayHasKey('base_path', $this->ext->getConfigVars($this->config));
    }

    public function testGetGlobalsMethodReturnsConfigVarsData()
    {
        $this->assertEquals($this->ext->getGlobals(), $this->ext->getConfigVars($this->config));
    }

    public function testInvalidFilenameShouldUseDefaultFile()
    {
        $brokenExt = new ConfigExtension('invalidfile.json');
        $config = $brokenExt->getConfigVars();

        $this->assertIsArray($config);
        $this->assertArrayHasKey('name', $config);
        $this->assertArrayHasKey('version', $config);
        $this->assertArrayHasKey('base_path', $config);
    }
    
}